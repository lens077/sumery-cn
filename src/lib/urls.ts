/** 镜像托管带 basePath 时给非 Next 资源（原生 <img>、GLTF）补前缀 */
export function withBase(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
