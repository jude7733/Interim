const userDevice: string[] = navigator.userAgent.split(" ");
export const os: string = (userDevice[1] + " " + userDevice[2])
  .replace("(", "")
  .replace(";", "");
export const packageManager: string =
  os.includes("Windows")
    ? "winget"
    : os.includes("Ubuntu")
    ? "apt"
    : os.includes("Fedora")
    ? "dnf"
    : os.includes("CentOS")
    ? "yum"
    : os.includes("Mac")
    ? "brew"
    : "unknown";
