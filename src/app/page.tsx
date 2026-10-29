import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Home do MVP (dashboard executivo da Liga).
 * TODO(mvp-scout-dashboard): tickets em .scratch/mvp-scout-dashboard/issues/
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">ScoutBR</h1>
        <Badge variant="secondary">Série A</Badge>
      </div>
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Scout do Campeonato Brasileiro: estatísticas de times e jogadores
            normalizadas por 90 minutos, com percentil por grupo posicional.
          </p>
          <p>
            Dados ainda não sincronizados — rode <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">npm run sync</code>{" "}
            para popular o banco local (ver <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.env.example</code>).
          </p>
          <p className="text-xs">
            Espec do MVP: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.scratch/mvp-scout-dashboard/spec.md</code>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
