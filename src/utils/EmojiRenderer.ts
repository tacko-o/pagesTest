import { useEffect, useState } from 'react';
import '../App.css';
import { Font } from '../components/FontButton';

/**
 * プレビュー用canvas描画
 */
export async function getPng(text: string, font: Font, color: string, borderColor: string, borderWidth: number): Promise<string> {
  return new Promise((resolve, reject) => {
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
          ctx.strokeText(line, canvas.width * 0.05, (fontSize * 0.92 * i) + fontSize * 0.05, canvas.width * 0.9);
          ctx.restore();
        });
      }

      // fill
      textLine.forEach((line, i) => {
        ctx.save();
        ctx.fillText(line, canvas.width * 0.05, (fontSize * 0.92 * i) + fontSize * 0.05, canvas.width * 0.9);
        ctx.restore();
      });
      resolve(canvas.toDataURL());
    } catch (e) {
      reject();
    }
  });
}