export class MenuItem {
  constructor(
    public name: string,
    public state: string,
    public short_label: string,
    public type: string,
    public icon?: string,
    public children?: MenuItem
  ) { }
}
