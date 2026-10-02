# muse.ai agree

> 用于 muse.ai 的自动审批油猴脚本 / An auto-approval userscript for muse.ai

- [中文说明](#中文)
- [English](#english)

---

## 中文

### 简介

muse.ai agree 通过页面 RPC 通道串行处理 muse.ai 的待审批请求（egress approvals），支持自动审批、定时停止和浮球面板控制。

### 功能

- **自动审批**：轮询待审批队列，逐条同意（默认决策为「始终允许」`allow_always`），串行执行且自动去重，不会重复提交。
- **立即处理**：闪电按钮一键处理当前全部待办。
- **运行时长**：设置自动模式运行 X 分钟（默认 10 分钟，范围 1–1440），到期自动停止；修改时长后从保存时重新计时。
- **审批间隔**：设置每条审批之间的间隔秒数（默认 0.2 秒，范围 0–30）。
- **浮球控制**：可拖动的头像浮球，点击展开设置面板，位置自动保存。
- **主题自适应**：浅色/深色随系统自动切换；猫爪状态点灰色 = 已停止、粉色 = 运行中。
- **自动重试**：临时性错误（断连、网络抖动、429 限流等）自动指数退避重试。
- **配置持久化**：设置保存在 localStorage，刷新页面不丢失。

### 使用方法

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/)（油猴）。
2. 新建脚本，将 [`muse.ai-agree.js`](./muse.ai-agree.js) 的全部内容粘贴进去并保存（`Ctrl+S`），或直接将脚本文件拖入 Tampermonkey 安装。
3. 打开 [muse.ai](https://muse.ai/) 并登录。
4. 点击头像浮球展开面板：
   - **电源图标**：开启 / 关闭自动处理
   - **钟表图标**：设置运行时长（分钟）
   - **沙漏图标**：设置每条审批间隔（秒）
   - **闪电图标**：立即处理当前全部待审批
5. 点击面板外部或按 `Esc` 可收起面板；拖动头像可自由调整位置。

### 默认行为

- 首次使用默认开启自动审批，决策为「始终允许」，运行 10 分钟，每条间隔 0.2 秒。
- 到期自动停止；如需继续，重新打开开关即可。
- 连接目标（RPC 网关）变化时自动停止，避免在错误的目标上继续操作。

### 注意事项

- 自动「始终允许」意味着脚本会替你确认所有审批请求，开启前请确认你信任页面中的任务。
- 脚本只在 muse.ai 域名下运行（`muse.ai` 及其子域名）。

### 版权与许可

版权所有 © 2026 moequan。保留所有权利。

本软件依据 **知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议（CC BY-NC-ND 4.0）** 发布：

- ✅ 您可以自由分享本软件，但必须署名原作者 **moequan**
- 🚫 禁止将本软件用于任何商业目的
- 🚫 禁止改编、混编或以本软件为基础创作演绎作品后重新发布

完整许可文本：https://creativecommons.org/licenses/by-nc-nd/4.0/

---

## English

### Introduction

muse.ai agree processes pending approval requests (egress approvals) on muse.ai **serially** through the page's RPC channel, with auto-approval, timed stop, and a floating-ball control panel.

### Features

- **Auto-approve**: polls the pending approval queue and approves each request (default decision: `allow_always`), serially and with deduplication — no double submissions.
- **Process now**: the bolt button handles all currently pending approvals at once.
- **Run duration**: set how many minutes auto mode runs (default 10, range 1–1440); it stops automatically when time is up, and changing the duration restarts the countdown from the moment you save.
- **Per-approval interval**: set the delay between approvals in seconds (default 0.2, range 0–30).
- **Floating-ball control**: a draggable avatar ball that opens the settings panel; its position is saved automatically.
- **Adaptive theme**: light/dark follows the system; the paw status dot is gray when stopped and pink when running.
- **Auto retry**: transient errors (disconnects, network hiccups, 429 rate limits, etc.) are retried with exponential backoff.
- **Persistent config**: settings are stored in localStorage and survive page reloads.

### Usage

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Create a new script, paste the entire contents of [`muse.ai-agree.js`](./muse.ai-agree.js) into it, and save (`Ctrl+S`) — or simply drag the script file into Tampermonkey to install it.
3. Open [muse.ai](https://muse.ai/) and sign in.
4. Click the avatar ball to open the panel:
   - **Power icon**: turn auto-processing on/off
   - **Clock icon**: set the run duration (minutes)
   - **Hourglass icon**: set the interval between approvals (seconds)
   - **Bolt icon**: process all currently pending approvals right now
5. Click outside the panel or press `Esc` to close it; drag the ball to reposition it anywhere.

### Default behavior

- On first use, auto-approval is enabled by default with the `allow_always` decision, running 10 minutes at a 0.2-second interval.
- It stops automatically when time is up; flip the switch again to continue.
- If the connection target (RPC gateway) changes, it stops automatically to avoid acting on the wrong target.

### Notes

- Auto `allow_always` means the script confirms every approval request on your behalf — make sure you trust the tasks on the page before enabling it.
- The script only runs on muse.ai domains (`muse.ai` and its subdomains).

### Copyright & License

Copyright © 2026 moequan. All rights reserved.

This software is released under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)**:

- ✅ You may freely share this software, provided you credit the original author **moequan**
- 🚫 You may not use this software for any commercial purpose
- 🚫 You may not adapt, remix, or create derivative works based on this software for redistribution

Full license text: https://creativecommons.org/licenses/by-nc-nd/4.0/

---

## Version

- **3.4.2** · Author: moequan · Copyright © 2026
