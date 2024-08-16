import { ValidationError, XMLValidator } from 'fast-xml-parser';
import hljs from 'highlight.js';
import xmlConfig from 'highlight.js/lib/languages/xml';
import vkbeautify from 'vkbeautify';

hljs.registerLanguage('xml', (hljs) => {
    const config = xmlConfig(hljs);

    config.contains.push({
        className: 'number',
        begin: /(\d+-?)+/,
    });

    return config;
});

export type XMLWorkerMessage = {
    code: string;
} & (
    | {
          type: 'format';
      }
    | {
          type: 'highlight';
      }
);

export type XMLWorkerResponse =
    | {
          result:
              | {
                    code: string;
                    error?: never;
                }
              | {
                    code?: never;
                    error: ValidationError['err'];
                };
          type: 'format';
      }
    | {
          result: string;
          type: 'highlight';
      };

self.addEventListener('message', (e: MessageEvent<XMLWorkerMessage>) => {
    const sourceCode = e.data.code;

    if (e.data.type === 'format') {
        const validationResult = XMLValidator.validate(sourceCode);
        let invalid = false;

        if (validationResult !== true) {
            if (validationResult.err.msg === 'Multiple possible root nodes found.') {
                invalid = false;
            } else {
                invalid = true;
            }
        }

        if (invalid) {
            self.postMessage({ result: { error: (validationResult as ValidationError).err }, type: 'format' });
        } else {
            self.postMessage({ result: { code: vkbeautify.xml(sourceCode) }, type: 'format' });
        }
    }

    if (e.data.type === 'highlight') {
        self.postMessage({ result: hljs.highlight(sourceCode, { language: 'xml' }).value, type: 'highlight' });
    }
});

export {};
