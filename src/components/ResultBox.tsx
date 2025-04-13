import React, { useEffect, useState } from 'react';
import '../App.css';
import { Font } from './FontButton';

/** ResultBoxプロパティ */
type ResultBoxProps = {
  text: string,
  font: Font,
  color: string,
}

const ResultBox = ({ text, font, color }: ResultBoxProps) => {
  /** 結果png */
  const [png, setPng] = useState<string | null>(null)

  /**
   * プレビュー用canvas描画
   */
  const getPngFromString = async (text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const fontSize = 32;
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px '${font.name}', serif`;

        // draw
        const textLine = text.split('\n');
        textLine.forEach((line, i) => {
          ctx.save();
          const lineWidth = ctx.measureText(line).width;
          ctx.scale(canvas.width / lineWidth, 4 / textLine.length);
          ctx.fillText(line, 0, (fontSize - 4) * (i + 1));
          ctx.restore();
        });
        resolve(canvas.toDataURL());
      } catch (e) {
        reject();
      }
    });
  }

  useEffect(() => {
    (async () => {
      const png = await getPngFromString(text);
      setPng(png);
    })();
  }, [text, font, color])

  /**
   * 全角1,半角0.5として文字長を返す
   * @param str 長さを計算する文字列
   * @returns number 文字長
   */
  const getLength = (str: string): number => {
    // 全角文字以外の文字数
    const fullWidthLength = (str.match(/[^ -~｡-ﾟ]/g) ?? []).length;

    // 半角文字の文字数
    const halfWidthLength = str.length - fullWidthLength;
    return fullWidthLength + halfWidthLength * 0.6;
  }

  return (
    <>
      <div>
        <span className='reault'>
          {png && (
            <div className="comp" style={{ display: 'flex' }}>
              <img alt="result" src={png} />
            </div>
          )}
        </span>
      </div>
    </>
  );
}

export default ResultBox;
