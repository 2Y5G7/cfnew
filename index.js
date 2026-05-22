// 动态导入混淆文件并直接将其默认导出
export default {
  async fetch(request, env, ctx) {
    // 动态加载原作者的混淆文件
    const worker = await import("./少年你相信光吗");
    
    // 优先调用混淆文件里的 fetch 方法，兼容不同的导出格式
    if (worker.default && typeof worker.default.fetch === 'function') {
      return worker.default.fetch(request, env, ctx);
    } else if (typeof worker.fetch === 'function') {
      return worker.fetch(request, env, ctx);
    } else if (typeof worker === 'function') {
      return worker(request, env, ctx);
    }
    
    throw new Error("未能从原文件中解析出有效的 Fetch 监听器");
  }
};export * from "./少年你相信光吗"
