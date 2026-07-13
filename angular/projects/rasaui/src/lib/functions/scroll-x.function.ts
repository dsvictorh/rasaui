export function scrollX(e: WheelEvent): void {
   const element = e.currentTarget as HTMLElement;
   e.preventDefault();

   const delta = e.deltaY;

   const maxScrollLeft = element.scrollWidth - element.clientWidth;

   const scrollingRight = delta > 0 && element.scrollLeft < maxScrollLeft;
   const scrollingLeft = delta < 0 && element.scrollLeft > 0;

   if (scrollingRight || scrollingLeft) {
      e.preventDefault();
      element.scrollLeft += delta * 2;
   }
}
