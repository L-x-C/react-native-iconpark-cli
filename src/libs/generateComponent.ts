import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { camelCase, upperFirst } from 'lodash';
import { XmlData } from 'iconfont-parser';
import { Config } from './getConfig';
import { getTemplate } from './getTemplate';
import {
  replaceCases,
  replaceComponentName,
  replaceImports,
  replaceExports,
  replaceNames,
  replaceNamesArray,
  replaceSingleIconContent,
  replaceSize,
  replaceSvgComponents,
  replaceHelper,
  replaceComponentXml,
} from './replace'
import { whitespace } from './whitespace';
import { copyTemplate } from './copyTemplate';
import { ILocalSvg } from '../libs/parseLocalSvg';

const SVG_MAP = {
  path: 'Path',
  g: 'G',
  symbol: 'Symbol',
  defs: 'Defs',
  circle: 'Circle',
  rect: 'Rect',
  linearGradient: 'LinearGradient',
  stop: 'Stop',
  mask: 'Mask',
};


export const generateComponent = (data: XmlData, localSvg: ILocalSvg[], config: Config) => {
  const svgComponents: Set<string> = new Set();
  const names: string[] = [];
  const imports: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const jsxExtension = config.use_typescript ? '.tsx' : '.js';
  const jsExtension = config.use_typescript ? '.ts' : '.js';
  let cases: string = '';

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  if (config.use_typescript) {
    svgComponents.add('GProps');
  }

  copyTemplate(`helper${jsExtension}`, path.join(saveDir, `helper${jsExtension}`));
  if (!config.use_typescript) {
    copyTemplate('helper.d.ts', path.join(saveDir, 'helper.d.ts'));
  }

  data.svg.symbol.forEach((item, index) => {
    let singleFile: string;
    const currentSvgComponents = new Set<string>(['Svg']);
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(
        new RegExp(`^${config.trim_icon_prefix}(.+?)$`),
        (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1')
      )
      : iconId;
    const componentName = upperFirst(camelCase(iconId));

    names.push(iconIdAfterTrim);

    if (config.use_typescript) {
      currentSvgComponents.add('GProps');
    }

    for (const key of Object.keys(SVG_MAP)) {
      currentSvgComponents.add(SVG_MAP[key]);
    }



    cases += `${whitespace(4)}case '${iconIdAfterTrim}':\n`;

    imports.push(componentName);
    cases += `${whitespace(6)}return <${componentName} key="${index + 1}" {...rest} />;\n`;

    singleFile = getTemplate('SingleIcon' + jsxExtension);
    singleFile = replaceSize(singleFile, config.default_icon_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);
    singleFile = replaceSingleIconContent(singleFile, generateCase(item, 4));
    singleFile = replaceHelper(singleFile);

    fs.writeFileSync(path.join(saveDir, componentName + jsxExtension), singleFile);

    if (!config.use_typescript) {
      let typeDefinitionFile = getTemplate('SingleIcon.d.ts');

      typeDefinitionFile = replaceComponentName(typeDefinitionFile, componentName);
      fs.writeFileSync(path.join(saveDir, componentName + '.d.ts'), typeDefinitionFile);
    }

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  /**
   * 本地文件添加
   */
  localSvg.forEach(({ name, svgStr, styleType }, index) => {
    let singleFile: string;

    const componentName = upperFirst(config.trim_icon_prefix) + upperFirst(camelCase(name));
    const currentSvgComponents = new Set<string>();

    if (config.use_typescript) {
      currentSvgComponents.add('GProps');
    }

    currentSvgComponents.add(styleType ? 'SvgCss' : 'SvgXml');

    names.push(name);

    cases += `${whitespace(4)}case '${name}':\n`;

    imports.push(componentName);

    cases += `${whitespace(6)}return <${componentName} key="L${index + 1}" {...rest} />;\n`;

    singleFile = getTemplate('LocalSingleIcon' + jsxExtension);
    singleFile = replaceSize(singleFile, config.default_icon_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);
    singleFile = replaceComponentXml(singleFile, `const xml = \`\n${svgStr}\n\``);
    singleFile = replaceSingleIconContent(singleFile, `\n${whitespace(4)}<${styleType ? 'SvgCss' : 'SvgXml'} xml={xml}  width={size} height={size} {...rest} />\n`);

    fs.writeFileSync(path.join(saveDir, componentName + jsxExtension), singleFile);

    if (!config.use_typescript) {
      let typeDefinitionFile = getTemplate('SingleIcon.d.ts');

      typeDefinitionFile = replaceComponentName(typeDefinitionFile, componentName);
      fs.writeFileSync(path.join(saveDir, componentName + '.d.ts'), typeDefinitionFile);
    }

    console.log(`${colors.green('√')} Generated local icon "${colors.yellow(name)}"`);
  })

  let iconFile = getTemplate('Icon' + jsxExtension);

  iconFile = replaceSize(iconFile, config.default_icon_size);
  iconFile = replaceCases(iconFile, cases);
  iconFile = replaceSvgComponents(iconFile, svgComponents);
  iconFile = replaceImports(iconFile, imports);
  iconFile = replaceExports(iconFile, imports);

  if (config.use_typescript) {
    iconFile = replaceNames(iconFile, names);
  } else {
    iconFile = replaceNamesArray(iconFile, names);

    let typeDefinitionFile = getTemplate('Icon.d.ts');

    typeDefinitionFile = replaceExports(typeDefinitionFile, imports);
    typeDefinitionFile = replaceNames(typeDefinitionFile, names);
    fs.writeFileSync(path.join(saveDir, 'index.d.ts'), typeDefinitionFile);
  }

  fs.writeFileSync(path.join(saveDir, 'index' + jsxExtension), iconFile);

  console.log(`\n${colors.green('√')} All icons have putted into dir: ${colors.green(config.save_dir)}\n`);
}


const generateInnerCase = (data: XmlData['svg']['symbol'][number], baseIdent: number, counter) => {
  let innerTemplate = ''
  for (const domName of Object.keys(data)) {
    let realDomName = SVG_MAP[domName];

    if (domName === '$') {
      continue;
    }

    if (!realDomName) {
      console.error(colors.red(`Unable to transform dom "${domName}"`));
      process.exit(1);
    }



    if (data[domName].$) {
      innerTemplate += `${whitespace(baseIdent + 2)}<${realDomName}${addAttribute(data[domName], counter)}\n${whitespace(baseIdent + 2)}/>\n`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        if (Object.keys(sub).length !== 1) {
          innerTemplate += `${whitespace(baseIdent + 2)}<${realDomName}${addAttribute(sub, counter)}\n${whitespace(baseIdent + 2)}>\n`;
          innerTemplate += generateInnerCase(sub, baseIdent + 4, counter)
          innerTemplate += `${whitespace(baseIdent + 2)}</${realDomName}>\n`;
        } else {
          innerTemplate += `${whitespace(baseIdent + 2)}<${realDomName}${addAttribute(sub, counter)}\n${whitespace(baseIdent + 2)}/>\n`;
          innerTemplate += generateInnerCase(sub, baseIdent, counter)
        }
      });
    }
  }

  return innerTemplate
}

const generateCase = (data: XmlData['svg']['symbol'][number], baseIdent: number) => {
  const counter = {
    colorIndex: 0,
    baseIdent,
  };
  let template = `\n${whitespace(baseIdent)}<Svg viewBox="${data.$.viewBox}" width={size} height={size} {...rest}>\n`;

  template += generateInnerCase(data, baseIdent, counter)

  template += `${whitespace(baseIdent)}</Svg>\n`;

  return template;
};

const addAttribute = (sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number, baseIdent: number }) => {
  let template = '';

  if (sub && sub.$) {
    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        if (sub.$[attributeName] === 'none') {
          template += `\n${whitespace(counter.baseIdent + 4)}${attributeName}='${sub.$[attributeName]}'`;
        } else {
          template += `\n${whitespace(counter.baseIdent + 4)}${attributeName}={getIconColor(color, ${counter.colorIndex}, '${sub.$[attributeName]}')}`;
          counter.colorIndex += 1;
        }
      } else {
        template += `\n${whitespace(counter.baseIdent + 4)}${camelCase(attributeName)}="${sub.$[attributeName]}"`;
      }
    }
  }

  return template;
};
