//eslint-disable-next-line @typescript-eslint/no-explicit-any -- Using any for property extracting recursive function
export function getProperty(obj: any, structure?: string): unknown {
   if (obj != null && structure?.trim()) {
      for (const prop of structure.split('.')) {
         obj = obj[prop];
      }
   }

   return obj ?? null;
}
