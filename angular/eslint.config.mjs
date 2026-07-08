// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import perfectionist from 'eslint-plugin-perfectionist';

export default defineConfig(
   {
      ignores: ['.angular/**', '.nx/**', 'coverage/**', 'dist/**'],
      files: ['**/*.ts'],
      extends: [
         eslint.configs.recommended,
         ...tseslint.configs.recommended,
         ...tseslint.configs.stylistic,
         ...angular.configs.tsRecommended,
         eslintConfigPrettier
      ],
      languageOptions: {
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname
         }
      },
      plugins: {
         'simple-import-sort': simpleImportSort,
         perfectionist
      },
      processor: angular.processInlineTemplates,
      rules: {
         '@angular-eslint/directive-selector': [
            'error',
            {
               type: 'attribute',
               style: 'camelCase'
            }
         ],
         '@angular-eslint/component-selector': [
            'error',
            {
               type: 'element',
               prefix: 'rasa',
               style: 'kebab-case'
            }
         ],
         '@angular-eslint/no-empty-lifecycle-method': 'warn',
         '@angular-eslint/prefer-output-readonly': 'warn',
         '@angular-eslint/prefer-signals': 'warn',
         '@angular-eslint/prefer-standalone': 'off',
         '@angular-eslint/no-output-native': 'off',
         '@angular-eslint/no-input-rename': 'off',
         '@typescript-eslint/array-type': ['warn'],
         '@typescript-eslint/consistent-indexed-object-style': 'off',
         '@typescript-eslint/consistent-type-assertions': 'warn',
         '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
         '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
               allowExpressions: true
            }
         ],
         '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
               accessibility: 'explicit'
            }
         ],
         '@typescript-eslint/naming-convention': [
            'warn',
            {
               selector: 'variable',
               format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
               leadingUnderscore: 'allow'
            }
         ],
         '@typescript-eslint/no-empty-function': 'warn',
         '@typescript-eslint/no-empty-object-type': 'error',
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/no-inferrable-types': 'off',
         '@typescript-eslint/no-shadow': 'warn',
         '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
         '@typescript-eslint/no-unused-expressions': [
            'error',
            {
               allowShortCircuit: true, // allow `foo && bar()`
               allowTernary: true, // allow `foo ? bar() : baz()`
               allowTaggedTemplates: true // allow tagged template literals
            }
         ],
         '@typescript-eslint/typedef': [
            'error',
            {
               parameter: true,
               arrowParameter: false,
               variableDeclaration: false,
               propertyDeclaration: false,
               memberVariableDeclaration: false
            }
         ],
         'max-len': 'off',
         'max-lines': ['error', 400],
         'no-bitwise': 'error',
         'no-console': 'off',
         'no-new-wrappers': 'error',
         'no-useless-concat': 'error',
         'no-var': 'error',
         'no-restricted-syntax': 'off',
         'no-shadow': 'error',
         'one-var': ['error', 'never'],
         'prefer-arrow-callback': 'error',
         'prefer-const': 'error',
         'simple-import-sort/imports': [
            'error',
            {
               groups: [
                  ['^@angular'], //Angular packages
                  ['^@(?!angular)(?!rasa)', '^[a-z]'], //External npm packages (scoped or unscoped)
                  ['^@rasa'], //Project-local aliases
                  ['^\\./', '^\\.\\./'], //Relative/physical paths
                  ['^\\u0000'] //"None" imports
               ]
            }
         ],
         'simple-import-sort/exports': 'error',
         'no-eval': 'error',
         'no-implied-eval': 'error'
      }
   },
   {
      files: ['**/*.html'],
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      rules: {
         '@angular-eslint/template/attributes-order': [
            'error',
            {
               alphabetical: true,
               order: [
                  'STRUCTURAL_DIRECTIVE', // deprecated, use @if and @for instead
                  'TEMPLATE_REFERENCE', // e.g. `<input #inputRef>`
                  'ATTRIBUTE_BINDING', // e.g. `<input required>`, `id="3"`
                  'INPUT_BINDING', // e.g. `[id]="3"`, `[attr.colspan]="colspan"`,
                  'TWO_WAY_BINDING', // e.g. `[(id)]="id"`,
                  'OUTPUT_BINDING' // e.g. `(idChange)="handleChange()"`,
               ]
            }
         ],
         '@angular-eslint/template/button-has-type': 'warn',
         '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }],
         '@angular-eslint/template/eqeqeq': 'off',
         '@angular-eslint/template/prefer-control-flow': 'error',
         '@angular-eslint/template/prefer-ngsrc': 'warn',
         '@angular-eslint/template/prefer-self-closing-tags': 'warn',
         '@angular-eslint/template/use-track-by-function': 'warn'
      }
   }
);
