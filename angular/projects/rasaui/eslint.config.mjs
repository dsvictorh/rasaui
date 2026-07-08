import rootConfig from '../../eslint.config.mjs';

export default [
   ...rootConfig,
   {
      files: ['projects/rasaui/**/*.ts'],
      rules: {
         '@angular-eslint/component-selector': [
            'error',
            {
               type: 'element',
               prefix: 'rasa',
               style: 'kebab-case'
            }
         ]
      }
   }
];
