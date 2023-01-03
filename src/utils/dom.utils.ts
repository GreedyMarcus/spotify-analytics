export class DomUtils {
  public static parseDataAttribute(value?: string): any {
    if (!value) return undefined;
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "undefined") return undefined;
    if (value === "null") return null;
    return value;
  }
}
