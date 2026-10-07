"""Sincroniza as imagens canônicas e publica o site no GitHub.

Execute a partir da cópia local do Site. Não altera nem inclui outras mudanças:
se o repositório já estiver modificado, interrompe antes de sincronizar.
"""

import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
SYNC = SITE / "scripts/sync_book_assets.py"


def git(*args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-c", f"safe.directory={SITE.as_posix()}", "-C", str(SITE), *args],
        text=True,
        check=check,
        capture_output=True,
    )


def main() -> None:
    if git("branch", "--show-current").stdout.strip() != "main":
        raise SystemExit("Publicação interrompida: a cópia local não está na branch main.")
    pending = git("status", "--porcelain").stdout.strip()
    if pending:
        print("Há mudanças locais no Site que ainda não foram publicadas:")
        print(pending)
        answer = input("Incluir essas mudanças neste envio? (s/n): ").strip().lower()
        if answer not in {"s", "sim", "y", "yes"}:
            raise SystemExit("Publicação interrompida: nada foi alterado.")
        git("add", "-A")
        git("commit", "-m", "Atualizações locais do Site")

    subprocess.run([sys.executable, str(SYNC), "--apply"], cwd=SITE, check=True)
    changed = git("status", "--porcelain").stdout.strip()
    if changed:
        # A cópia estava limpa antes da sincronização; só há alterações geradas acima.
        paths = [line[3:] for line in changed.splitlines()]
        git("add", "--", *paths)
        git("commit", "-m", "Sincroniza imagens dos assets canônicos")
        print(f"Imagens atualizadas em {len(paths)} arquivo(s) do Site.")
    else:
        print("As imagens do Site já estão sincronizadas com os assets canônicos.")

    print("Enviando a branch main ao GitHub...")
    result = git("push", "origin", "main", check=False)
    if result.returncode:
        print(result.stderr.strip() or result.stdout.strip(), file=sys.stderr)
        raise SystemExit("O envio falhou. As alterações locais foram preservadas; tente novamente quando a conexão voltar.")
    print("Site publicado.")


if __name__ == "__main__":
    main()
