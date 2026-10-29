/**
 * Schema do banco local (SQLite), conforme ADR-0001.
 *
 * Estatísticas de jogos vivem no local — a API-Football é consumida
 * apenas pelo Sync job, nunca no Caminho de request.
 *
 * `season` existe desde o dia 1 (ADR-0001): o MVP sincroniza só a
 * temporada corrente, mas o schema já suporta multi-temporada.
 */
import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const teams = sqliteTable("teams", {
  /** id da API-Football (ex.: 131 = Corinthians) */
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
});

export const players = sqliteTable("players", {
  /** id da API-Football (ex.: 667 = Memphis Depay) */
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  age: integer("age").notNull(),
  birthDate: text("birth_date"),
  nationality: text("nationality").notNull(),
  height: integer("height"),
  weight: integer("weight"),
  injured: integer("injured", { mode: "boolean" }).notNull().default(false),
  photo: text("photo").notNull(),
});

/**
 * Grupo posicional simplificado (ADR-0002), derivado no Sync job
 * e persistido como coluna — nunca computado na UI.
 */
export const POSITION_GROUPS = ["goleiro", "defensor", "meia", "atacante"] as const;
export type PositionGroup = (typeof POSITION_GROUPS)[number];

export const playerStatistics = sqliteTable(
  "player_statistics",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    /** id da Liga na API-Football (71 = Série A) */
    leagueId: integer("league_id").notNull(),
    /** Coluna desde o dia 1: MVP só 2026, schema pronto para multi-temporada */
    season: integer("season").notNull(),
    positionGroup: text("position_group", { enum: POSITION_GROUPS }).notNull(),
    minutes: integer("minutes").notNull().default(0),
    appearances: integer("appearances").notNull().default(0),
    lineups: integer("lineups").notNull().default(0),
    /** rating da fonte é string nullable ("6.56") — trata null como "sem rating" (ADR-0001) */
    rating: real("rating"),
    /** Estatísticas cruas no formato fonte (payload da API), agregações p90 em query time */
    raw: text("raw", { mode: "json" }).$type<Record<string, unknown>>().notNull(),
    syncedAt: integer("synced_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    uniqueIndex("player_statistics_uq").on(table.playerId, table.season, table.leagueId),
    index("player_statistics_season_idx").on(table.season, table.positionGroup),
  ],
);

export type Team = typeof teams.$inferSelect;
export type Player = typeof players.$inferSelect;
export type PlayerStatistic = typeof playerStatistics.$inferSelect;
