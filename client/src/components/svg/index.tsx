import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function SvgComponent({ style }) {
  const SvgImage = () => (
    <SvgXml
      style={style}
      xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 925.11 637.43"><path fill="currentColor" d="M464.31,34.62c-133.5,0-233.31,79.58-298.8,184.1C203.38,103.41,319.89,1,464.31,1S725.25,103.41,763.12,218.72C697.63,114.2,597.82,34.62,464.31,34.62Z" transform="translate(-1.76 -0.96)"/><path fill="currentColor" d="M464.3,34.62c84.91,0,122.72,96.43,152.39,169.25C614.26,127.58,575,16.54,464.3,16.54s-150,111-152.38,187.33C341.59,131.05,379.4,34.62,464.3,34.62Z" transform="translate(-1.76 -0.96)"/><polygon fill="currentColor" points="462.56 225.41 442.29 17.75 462.56 21.52 482.82 17.75 462.56 225.41"/><path fill="currentColor" d="M215.12,126.32c171.54-36.64,326.84-36.64,498.39,0C553.66,116.41,375,116.41,215.12,126.32Z" transform="translate(-1.76 -0.96)"/><path fill="currentColor" d="M464.32,201.89c126.43,0,229.54-2.66,229.54-5.93S590.75,190,464.32,190,234.79,192.69,234.79,196,337.9,201.89,464.32,201.89Z" transform="translate(-1.76 -0.96)"/><path fill="currentColor" d="M464.31,604.74c-133.5,0-233.31-79.58-298.8-184.1C203.38,536,319.89,638.4,464.31,638.4S725.25,536,763.12,420.64C697.63,525.16,597.82,604.74,464.31,604.74Z" transform="translate(-1.76 -0.96)"/><path fill="currentColor" d="M464.3,604.74c84.91,0,122.72-96.42,152.39-169.25C614.26,511.78,575,622.82,464.3,622.82s-150-111-152.38-187.33C341.59,508.32,379.4,604.74,464.3,604.74Z" transform="translate(-1.76 -0.96)"/><polygon fill="currentColor" points="462.56 425.87 442.29 619.69 462.56 615.91 482.82 619.69 462.56 425.87"/><path fill="currentColor" d="M215.12,513.05c171.54,36.63,326.84,36.63,498.39,0C553.66,523,375,523,215.12,513.05Z" transform="translate(-1.76 -0.96)"/><path fill="currentColor" d="M464.32,449.34c126.43,0,229.54-2.66,229.54-5.93s-103.11-5.94-229.54-5.94-229.53,2.67-229.53,5.94S337.9,449.34,464.32,449.34Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M146.08,253.48q10.71,3.84,10.72,10.24,0,2.08-1.92,7.84l-30.72,88.8a17,17,0,0,1-1.12,2.72q-.81,1.6-4.24,4.24a13.93,13.93,0,0,1-16.32,0,14,14,0,0,1-4.56-5.2L79.2,306.92q-17.76,52.49-18.08,53.44a14.52,14.52,0,0,1-1.44,2.72,18.63,18.63,0,0,1-2.56,3.2,12,12,0,0,1-8.8,3.68,13.84,13.84,0,0,1-8.4-2.4,13.26,13.26,0,0,1-4.4-4.8l-1.12-2.4L3.52,271.56a27.64,27.64,0,0,1-1.76-7.84q0-6.39,10.72-10.08a26.19,26.19,0,0,1,8.4-1.6,6.91,6.91,0,0,1,5.76,2.56,24.77,24.77,0,0,1,3.6,7.84l17.6,53.44,17.44-52.64A14.52,14.52,0,0,1,73.44,254a16.82,16.82,0,0,1,6.64-1.12,12.42,12.42,0,0,1,7.6,2.64,12.62,12.62,0,0,1,4.48,5.2l18.4,55.52,17.6-53.76q1.28-3.68,2.08-5.44a9.56,9.56,0,0,1,3-3.44,8.45,8.45,0,0,1,5.36-1.68A22.35,22.35,0,0,1,146.08,253.48Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M165.44,296.36q13.44-12.48,30.72-12.48t30.56,12.4Q240,308.69,240,327.88a41.6,41.6,0,0,1-6.88,23.6,43.14,43.14,0,0,1-16.72,15.2,45.29,45.29,0,0,1-20.4,4.88,43.54,43.54,0,0,1-20.48-5.2A45.23,45.23,0,0,1,158.8,351a40.27,40.27,0,0,1-6.8-23Q152,308.84,165.44,296.36Zm20,43.12a17,17,0,0,0,10.4,3.92q5.28,0,10.56-4t5.28-11.84q0-7.83-5-11.68A17.17,17.17,0,0,0,196,312a16.77,16.77,0,0,0-10.72,4q-5,4-5,11.76T185.44,339.48Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M307.68,286.76a10.92,10.92,0,0,1,5,3.28q2,2.32,2,7.44a25.36,25.36,0,0,1-3,11.2q-3,6.09-8.8,6.08a12.41,12.41,0,0,1-5.52-1.28,16.11,16.11,0,0,0-7-1.28,12.64,12.64,0,0,0-8.08,3,9.17,9.17,0,0,0-3.76,7.36v33.6a46.33,46.33,0,0,1-.24,5.52A12.87,12.87,0,0,1,276.8,366q-2.4,4.17-12.48,4.16-7.68,0-11-2.72-2.57-2.23-2.88-6.88v-60.8a46.56,46.56,0,0,1,.24-5.52,13.09,13.09,0,0,1,1.36-4.08q2.24-4.32,12.48-4.32,9.6,0,12,3.68a9.25,9.25,0,0,1,1.76,5.28,26.5,26.5,0,0,1,2.32-2.72,30,30,0,0,1,6.48-4.32,18.71,18.71,0,0,1,8.72-2.72,42.9,42.9,0,0,1,6.32.4A39.24,39.24,0,0,1,307.68,286.76Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M323.51,260.2a48.85,48.85,0,0,1,.24-5.52,15.11,15.11,0,0,1,1.36-4.24q2.25-4.32,12.49-4.32,9.75,0,12.15,4.32a12.63,12.63,0,0,1,1.52,4.32,48.72,48.72,0,0,1,.24,5.6v74.08q0,5.76,1,7.28c.64,1,2.06,1.52,4.24,1.52a25.54,25.54,0,0,1,4.4.24,8,8,0,0,1,2.72,1.36q3.21,2.09,3.2,11.36,0,10.08-3.2,12.32-4.15,2.88-19.84,1-12.32-1.59-16-8.16-4.47-7.83-4.48-25Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M432.39,250.68a6.82,6.82,0,0,1,4.25-3.28,34.48,34.48,0,0,1,16.16,0,6.71,6.71,0,0,1,4.23,3.36,13.52,13.52,0,0,1,1.44,4.24,44.05,44.05,0,0,1,.25,5.52V356a43.84,43.84,0,0,1-.25,5.52,11.21,11.21,0,0,1-1.52,4.08q-2.4,4.32-13.52,4.32T431,362.12q-6.72,7.68-18.72,7.68-14.38,0-26.24-12.56A41.35,41.35,0,0,1,374.23,328q0-16.71,11.92-29.36T412.31,286q11.85,0,18.41,8v-33.6a49.37,49.37,0,0,1,.23-5.52A13.24,13.24,0,0,1,432.39,250.68Zm-26,87A13.5,13.5,0,0,0,416.47,342a12.72,12.72,0,0,0,9.84-4.32,13.83,13.83,0,0,0,3.92-9.52,14.78,14.78,0,0,0-3.76-9.68A12.58,12.58,0,0,0,416.31,314a13,13,0,0,0-10.24,4.4,14.41,14.41,0,0,0-3.84,9.68A13.56,13.56,0,0,0,406.39,337.64Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M579.19,338.28q7.37,5,10.56,7.2,5.76,4.32,5.76,8.24t-4.8,11q-4.8,7.05-9.76,7-3,0-9.28-4.32c-.53-.32-2-1.33-4.48-3s-4.37-3-5.76-3.84A53.23,53.23,0,0,1,528,372q-24.8,0-41.84-17.6a58.17,58.17,0,0,1-17-41.92,64.46,64.46,0,0,1,4.8-24.88,57.8,57.8,0,0,1,12.8-19.44,60.22,60.22,0,0,1,18.4-12.32,53.81,53.81,0,0,1,21.44-4.48q23.69,0,41.12,17.12t17.44,43.36A63.58,63.58,0,0,1,579.19,338.28Zm-81.76-26.56q0,14.25,9.2,23.12t20.56,8.88q11.35,0,20.48-8.64t9.12-23.2q0-14.55-9.2-23.36T527,279.72q-11.35,0-20.48,8.88T497.43,311.72Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M637,369.8a34,34,0,0,1-26.8-12.24q-10.64-12.24-10.64-29.84v-28a46.26,46.26,0,0,1,.24-5.6,14.88,14.88,0,0,1,1.36-4.16q2.24-4.32,12.48-4.32,11.2,0,13.12,6.08a25.19,25.19,0,0,1,1,8.16v28q0,6.57,3.76,10.24t10.08,3.68A14,14,0,0,0,651.75,338a13.49,13.49,0,0,0,3.92-10.08V299.56a46.56,46.56,0,0,1,.24-5.52,13,13,0,0,1,1.52-4.24q2.09-4.16,12.32-4.16,10.08,0,12.32,4.32a14.79,14.79,0,0,1,1.36,4.24,46.56,46.56,0,0,1,.24,5.52v56.64a44.53,44.53,0,0,1-.24,5.36,11.4,11.4,0,0,1-1.52,4.08q-2.4,4.17-12.32,4.16-9.76,0-12-3.84a12.68,12.68,0,0,1-1.6-6.56,16.23,16.23,0,0,1-2.88,3.2,38.28,38.28,0,0,1-4.32,3.52A21.34,21.34,0,0,1,637,369.8Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M777.75,317.88q0,9.84-4.88,14.56a15.23,15.23,0,0,1-10.8,4.72H724.15q0,4.48,5.28,7.52a21,21,0,0,0,10.56,3q9.28,0,14.56-1.92l1.76-.64a16.18,16.18,0,0,1,6.4-1.76q5.12,0,8.8,7.2a17.78,17.78,0,0,1,2.08,7.36q0,14.25-34.08,14.24a51.39,51.39,0,0,1-21-4.08,35.67,35.67,0,0,1-14.32-10.8,46,46,0,0,1-10.08-29q0-20.16,13-32.24T739.67,284q22.23,0,32.64,15.68A32.58,32.58,0,0,1,777.75,317.88ZM744,322.6c4,0,6.08-1.7,6.08-5.12a7.21,7.21,0,0,0-2.8-5.92q-2.81-2.24-8-2.24T729,313.56q-5.13,4.24-5.12,9Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M788.79,362.6a6.65,6.65,0,0,1-3-6.08q0-4.15,6.08-12.64,1.75-2.72,5.68-2.72t10.64,3.92q6.72,3.93,12.16,3.92,9.75,0,9.76-3.84,0-3-10.72-4.48a52.25,52.25,0,0,1-20-7.52,21.27,21.27,0,0,1-7.68-9,32.67,32.67,0,0,1-3-14.64q0-25.28,34.72-25.28a56.5,56.5,0,0,1,23.36,5.44q5.6,2.57,5.6,6.4t-3.52,9.44q-3.52,5.61-7.2,5.6c-1.28,0-3.66-.8-7.12-2.4a26.61,26.61,0,0,0-11.28-2.4q-9.45,0-9.44,3.52,0,4.8,10.88,6.24a59.81,59.81,0,0,1,20.48,6.08,18.17,18.17,0,0,1,7.76,7.76Q856,335.4,856,343.72a29.68,29.68,0,0,1-3.12,14.16,20.23,20.23,0,0,1-8.72,8.72q-10.24,5-25.68,5A54.86,54.86,0,0,1,788.79,362.6Z" transform="translate(-1.76 -0.96)"/><path fill="#fff" d="M912.79,314.12l-10.4-.64v22.08q0,4.32,1.36,6.24t5.12,1.92a51.82,51.82,0,0,1,5.76.24,11.42,11.42,0,0,1,4.24,1.52q3.68,2.08,3.68,10.72,0,10.08-4.48,12.32a14.79,14.79,0,0,1-4.24,1.36,44.76,44.76,0,0,1-5.36.24q-16.63,0-25.28-7.52t-8.64-25.44V313.48A42.12,42.12,0,0,1,868,314a7.32,7.32,0,0,1-5.84-2.72q-2.32-2.72-2.32-9.28a40.51,40.51,0,0,1,.8-9.52,8.58,8.58,0,0,1,2.24-4.24,9.84,9.84,0,0,1,6.4-2.08l5.28.64V270.28a44.46,44.46,0,0,1,.24-5.44,10.18,10.18,0,0,1,1.52-3.84q2.07-4,12.32-4,10.88,0,13,5.92a30.08,30.08,0,0,1,.8,8.16v15.68c4.69-.42,8.24-.64,10.64-.64a45.6,45.6,0,0,1,5.44.24,13,13,0,0,1,4.24,1.52q4.15,2.08,4.16,12.32,0,10.08-4.32,12.32a14.69,14.69,0,0,1-4.24,1.36A46.56,46.56,0,0,1,912.79,314.12Z" transform="translate(-1.76 -0.96)"/></svg>`}
    />
  );

  return <SvgImage />;
}
