import sonarqubeScanner from 'sonarqube-scanner';
import dotenv from 'dotenv'

dotenv.config({ path: '../../config/.env.dev' });

const domain = process.env.DOMAIN

sonarqubeScanner(
    {
        serverUrl:  `http://${domain}:9000`,
        options : {
            'sonar.sources':  'src',
            'sonar.tests':  'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx'
            // 'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            // 'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});