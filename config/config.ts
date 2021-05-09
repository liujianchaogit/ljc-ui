import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  layout: {
    siderWidth: 208,
    ...defaultSettings
  },
  locale: {
    antd: true,
    baseNavigator: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  history: { type: 'hash' },
  define: { API_URL: 'http://121.4.241.251:9090' }
});
