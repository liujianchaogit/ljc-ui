import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  layout: {},
  locale: {
    antd: true,
    baseNavigator: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
});
