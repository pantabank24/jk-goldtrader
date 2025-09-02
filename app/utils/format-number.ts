export function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " พันล้าน";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " ล้าน";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " พัน";
    }
    return num.toString();
  }