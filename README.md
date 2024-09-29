# Pixfolio - 一款用于展示作品集的小工具，基于 Golang & SolidJS 开发。

<img align="right" height="96px" src="./public/logo.png" alt="Memos" />


<p>
  <a href="https://github.com/zxdstyle/pixfolio/blob/main/LICENSE"><img src="https://img.shields.io/github/license/besscroft/kamera?style=flat-square" alt="许可证"></a>
  <img src="https://img.shields.io/github/repo-size/zxdstyle/pixfolio?style=flat-square&color=328657" alt="存储库大小">
</p>

## 主要功能点

- **数据隐私** 🏠: 所有数据都安全地存储在本地数据库中。
- **极致性能** ✍️: 基于 Golang & SolidJS 构建，足够轻量强大。
- **部署便捷** ✍️: 仅一个二进制文件，无需其他任何依赖。
- **代码开源** 🦦: 拥抱开源，所有代码都可以在 GitHub 上找到。
- **免费使用** 💸: 完全免费享受所有功能，任何内容都是免费的。

## 安装

### Docker 一键部署
```
    docker run -p 3001:3001 -it zxdstyle/pixfolio
```

### 二进制文件部署
1. 从 [Releases](https://github.com/zxdstyle/pixfolio/releases) 下载对应平台的二进制文件。
2. 初始化环境 `./pixfolio-darwin-amd64 artisan install` 或者  `./pixfolio-linux-amd64 artisan install`
3. 启动服务 `./pixfolio-darwin-amd64 artisan serve` 或 `./pixfolio-linux-amd64 artisan serve`

### 源码构建
1. 克隆 [GitHub 存储库](https://github.com/zxdstyle/pixfolio) 来拉取 Pixfolio 源代码：
    ```
    git clone https://github.com/zxdstyle/pixfolio.git
   
    cd pixfolio
   
    go build
    
    ./pixfolio artisan install && ./pixfolio artisan serve
   ```