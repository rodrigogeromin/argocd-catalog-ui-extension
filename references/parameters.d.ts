export interface GenerationParameters {
  name: string;
  description: string;
  argoCdVersion: '3.5.1';
  profile: 'top-bar-action-menu';
  registration?: {title?: string; id?: string; iconClassName?: string; isMiddle?: boolean};
  dataSource?: 'host-props';
}
