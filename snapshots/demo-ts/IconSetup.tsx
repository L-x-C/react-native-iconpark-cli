/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconSetup: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M720.36316 371.018l-56.188-172.934c-4.654-14.322-20.036-22.16-34.358-17.506l-78.07 25.366c-7.25 2.356-15.224 0.726-20.912-4.346a256.276 256.276 0 0 0-41.218-29.96c-6.576-3.842-10.58-10.922-10.58-18.538V71.03c0-15.058-12.208-27.266-27.266-27.266h-181.834c-15.058 0-27.266 12.208-27.266 27.266v82.114c0 7.614-4.002 14.69-10.576 18.534a256.258 256.258 0 0 0-41.168 29.934c-5.69 5.074-13.664 6.704-20.916 4.348l-78.12-25.382c-14.322-4.654-29.704 3.184-34.356 17.506L1.34316 371.016c-4.654 14.322 3.184 29.704 17.506 34.356l78.05 25.36c7.252 2.356 12.754 8.364 14.366 15.816a253.468 253.468 0 0 0 15.718 48.46c3.072 6.984 2.162 15.076-2.322 21.248l-48.22 66.37c-8.852 12.182-6.15 29.234 6.032 38.084l147.108 106.882c12.182 8.852 29.234 6.15 38.086-6.032l48.188-66.326c4.484-6.17 11.894-9.538 19.484-8.776 8.404 0.844 16.926 1.284 25.552 1.284 8.604 0 17.104-0.44 25.486-1.28 7.588-0.76 14.998 2.606 19.48 8.776l48.184 66.32c8.852 12.182 25.902 14.884 38.086 6.032l147.108-106.882c12.182-8.852 14.882-25.902 6.032-38.084l-48.176-66.308c-4.486-6.174-5.394-14.268-2.32-21.252a253.424 253.424 0 0 0 15.75-48.544c1.612-7.454 7.114-13.46 14.368-15.816l77.968-25.334c14.322-4.65 22.16-20.032 17.506-34.352z m-359.472 120.706c-54.924 0-99.448-44.524-99.448-99.448s44.524-99.448 99.448-99.448 99.448 44.524 99.448 99.448-44.526 99.448-99.448 99.448z"
        fill={getIconColor(color, 0, '#5B6EA2')}
      />
      <Path
        d="M360.89116 516.228c-68.346 0-123.952-55.604-123.952-123.952s55.604-123.952 123.952-123.952 123.952 55.604 123.952 123.952-55.606 123.952-123.952 123.952z m0-198.894c-41.324 0-74.944 33.62-74.944 74.944s33.618 74.944 74.944 74.944 74.944-33.618 74.944-74.944-33.62-74.944-74.944-74.944z"
        fill={getIconColor(color, 1, '#86DBD5')}
      />
      <Path
        d="M335.33916 646.46c8.404 0.844 16.926 1.284 25.552 1.284 8.604 0 17.104-0.44 25.486-1.278 7.588-0.76 14.998 2.606 19.48 8.776l48.184 66.32c8.852 12.182 25.902 14.884 38.086 6.032l74.012-53.772c-121.448-49.224-191.894-126.576-231.428-211.328-28.45-10.642-48.762-38.098-48.762-70.216a74.514 74.514 0 0 1 13.154-42.348c-23.962-126.424-1.346-249.502 6.73-306.166h-35.896c-15.058 0-27.266 12.208-27.266 27.266v82.114c0 7.614-4.002 14.69-10.576 18.536a256.152 256.152 0 0 0-41.166 29.934c-5.69 5.074-13.664 6.704-20.916 4.348L91.89116 180.578c-14.322-4.654-29.704 3.184-34.356 17.506L1.34316 371.016c-4.654 14.322 3.184 29.704 17.506 34.356l78.05 25.36c7.252 2.356 12.754 8.364 14.366 15.816a253.468 253.468 0 0 0 15.718 48.46c3.072 6.984 2.162 15.076-2.322 21.248l-48.22 66.37c-8.852 12.182-6.15 29.234 6.032 38.084l147.108 106.882c12.182 8.852 29.234 6.15 38.086-6.032l48.188-66.326c4.484-6.168 11.894-9.536 19.484-8.774z"
        opacity=".1"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M1004.51916 274.936l-69.236-69.236c-25.976-25.976-68.09-25.976-94.066 0L576.30116 470.614a33.62 33.62 0 0 0-9.412 29.166l2.754 16.948a41.288 41.288 0 0 1-11.558 35.818l-25.652 25.652 99.586 99.586 25.652-25.652a41.286 41.286 0 0 1 35.818-11.558l16.948 2.754a33.62 33.62 0 0 0 29.166-9.412L1004.51916 369c25.976-25.976 25.976-68.09 0-94.064z"
        fill={getIconColor(color, 3, '#F7B96D')}
      />
      <Path
        d="M667.65916 542.558c-12.176-12.176-12.176-31.92 0-44.096l197.396-197.396c12.176-12.176 31.92-12.176 44.096 0 12.176 12.176 12.176 31.92 0 44.096l-197.396 197.396c-12.176 12.176-31.918 12.176-44.096 0z"
        fill={getIconColor(color, 4, '#FDE27C')}
      />
      <Path
        d="M657.67116 652.132a41.274 41.274 0 0 1 31.768-11.996c-59.072-47.372-67.294-184.166 2.842-285.502l-115.98 115.98a33.62 33.62 0 0 0-9.412 29.166l2.754 16.948a41.288 41.288 0 0 1-11.558 35.818l-25.652 25.652 99.586 99.586 25.652-25.652z"
        opacity=".1"
        fill={getIconColor(color, 5, '#333333')}
      />
      <Path
        d="M402.00116 852.312l146.338-146.338-44.096-44.096-146.338 146.338a45.4 45.4 0 0 1-15.862 10.294l-68.064 26.086a37.556 37.556 0 0 0-22.032 22.738l-20.978 60.356a17.81 17.81 0 0 0 4.23 18.444l28.884 28.884a17.816 17.816 0 0 0 18.444 4.23l60.356-20.978a37.556 37.556 0 0 0 22.738-22.032l26.086-68.064a45.4 45.4 0 0 1 10.294-15.862z"
        fill={getIconColor(color, 6, '#495059')}
      />
      <Path
        d="M504.23916 661.878l44.094 44.094-29.092 29.094-44.094-44.096z"
        opacity=".1"
        fill={getIconColor(color, 7, '#333333')}
      />
      <Path
        d="M590.08516 747.722l-127.59-127.59c-9.862-9.862-9.862-25.85 0-35.712l20.222-20.222c9.862-9.862 25.85-9.862 35.712 0l127.59 127.59c9.862 9.862 9.862 25.85 0 35.712l-20.222 20.222c-9.86 9.862-25.85 9.862-35.712 0z"
        fill={getIconColor(color, 8, '#FDE27C')}
      />
      <Path
        d="M518.43116 564.198c-9.862-9.862-25.85-9.862-35.712 0l-20.222 20.222c-9.862 9.862-9.862 25.85 0 35.712l100.512 100.512c-38.162-57.234-28.442-108.238-16.758-128.628l-27.82-27.818z"
        opacity=".1"
        fill={getIconColor(color, 9, '#333333')}
      />
    </Svg>
  );
};

IconSetup.defaultProps = {
  size: 20,
};

IconSetup = React.memo ? React.memo(IconSetup) : IconSetup;

export default IconSetup;
