export async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
