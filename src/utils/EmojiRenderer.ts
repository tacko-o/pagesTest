import { useEffect, useState } from 'react';
import '../App.css';
import { Font } from '../components/FontButton';

/**
 * プレビュー用canvas描画
 */
export async function getPng(text: string, font: Font, color: string, yOffset: number, borderColor: string, borderWidth: number): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;

      const textLine = text.split('\n');
      const fontSize = canvas.width / textLine.length;

      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'round';
      ctx.textBaseline = 'top';
      ctx.font = `${fontSize}px '${font.name}', serif`;

      // stroke
      if (borderWidth > 0) {
        textLine.forEach((line, i) => {
          ctx.save();
          //const lineWidth = ctx.measureText(line).width;
          ctx.strokeText(line, canvas.width * 0.05, (fontSize * 0.9 * i) + fontSize * 0.05 + yOffset, canvas.width * 0.9);
          ctx.restore();
        });
      }

      // fill
      textLine.forEach((line, i) => {
        ctx.save();
        ctx.fillText(line, canvas.width * 0.05, (fontSize * 0.92 * i) + fontSize * 0.05 + yOffset, canvas.width * 0.9);
        ctx.restore();
      });

      resolve(canvas.toDataURL());
    } catch (e) {
      reject();
    }
  });
}

/**
 * Y軸オフセットを返す。
 * ブラウザによってy軸方向の描画がずれてるので計算する
 * @param canvas 絵文字が描画されたキャンバス
 * @returns Yオフセット
 */
export function getYOffset(font: Font): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    
    const ctx = canvas.getContext('2d')!;
    ctx.textBaseline = 'top';
    ctx.font = `128px '${font.name}', serif`;

    // fill
    ctx.fillText("F", 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for (var i = 0; i < data.length; i += 4) {
      // データ4つでrgba 1px分
      // 一番上の行から走査して最初に0以上の値が出てきたピクセルを確保
      if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0 || data[i + 3] !== 0) {
        console.log(data[i], data[i + 1], data[i + 2], data[i + 3]);
        break;
      }
    }
    i++;

    // 一番上の行を計算
    const yOffset = Math.floor(canvas.width / Math.floor(i / 4));
    console.log(yOffset);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    //return -yOffset;

    return canvas.toDataURL();
  } catch (e) {
    throw e;
  }
}