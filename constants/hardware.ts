export interface HardwareItem {
  key: string;
  title: string;
  description: string;
  href: string;
}

// Nothing here yet — the `hardware.` block on /skills hides itself while this
// list is empty. Add your own machine, display and peripherals, e.g.:
//
// {
//   description: 'Space Black, 16/512 GB',
//   href: 'https://www.apple.com/macbook-pro/',
//   key: 'macbook-pro-m4',
//   title: 'MacBook Pro M4',
// },
export const HARDWARE_ITEMS: HardwareItem[] = [];
