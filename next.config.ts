import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // 确保这些包被正确转译
  transpilePackages: [
    "@assistant-ui/react",
    "@assistant-ui/react-ai-sdk",
    "assistant-stream",
  ],
  webpack(config, { dev }) {
    // 添加别名来解析本地源代码
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@assistant-ui/react": path.resolve(
        __dirname,
        "../assistant-ui/packages/react/src"
      ),
      "@assistant-ui/react-ai-sdk": path.resolve(
        __dirname,
        "../assistant-ui/packages/react-ai-sdk/src"
      ),
      "assistant-stream": path.resolve(
        __dirname,
        "../assistant-ui/packages/assistant-stream/src"
      ),
    };

    // 添加对 .markdown 文件的支持
    config.module.rules.push({
      test: /\.markdown$/,
      use: "raw-loader",
    });

    // 开发模式下启用源映射和文件监听
    if (dev) {
      config.devtool = "eval-source-map";

      // 监听外部文件变化
      config.watchOptions = {
        ...config.watchOptions,
        ignored: "**/node_modules/**",
        poll: 1000,
      };
    }

    return config;
  },

  output: "standalone",
  // 确保包含 mdx 扩展
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // 启用外部目录支持
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
