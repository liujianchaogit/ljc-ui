import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'LJC Design Pro',
  pwa: false,
  logo: 'logo.svg',
  iconfontUrl: 'font_2325568_r39e4ou7y1.js',
  menu: { locale: false }
};

export default Settings;
