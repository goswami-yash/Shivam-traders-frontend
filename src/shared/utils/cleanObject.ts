export const cleanObject = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (v === null || v === undefined || v === "") return false; // drop null, undefined, ""
      if (Array.isArray(v) && v.length === 0) return false;        // drop empty arrays
      if (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0) return false; // drop empty objects
      return true;
    })
  );
};

export  const isEditorEmpty = (html?: string) => {
        return !html
          ?.replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, "")
          .trim();
      };
