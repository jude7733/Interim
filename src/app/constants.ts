const os: string = navigator.userAgent.split(" ")[2].replace(";", "");
export const packageManager: string =
  os === "Windows"
    ? "winget"
    : os === "Ubuntu"
    ? "apt"
    : os === "Fedora"
    ? "dnf"
    : os === "CentOS"
    ? "yum"
    : os === "Mac"
    ? "brew"
    : "unknown";
