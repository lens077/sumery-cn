"use client";

export default function GlobalError() {
  return (
    <html lang="zh-CN">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#0a1128",
          color: "#f2f5fb",
          padding: "8rem 1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.875rem" }}>出了点问题</h1>
        <p style={{ color: "#8b9cc4", marginTop: "1rem" }}>
          应用发生错误，请稍后重试。
        </p>
      </body>
    </html>
  );
}
