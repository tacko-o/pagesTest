import '../App.css';
import { Font } from '../components/FontButton';

/**
 * プレビュー用canvas描画
 */
export async function getPng(text: string, font: Font, color: string, borderColor: string, borderWidth: number, lineHeight: number): Promise<string> {
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

      // 各ブラウザでfillTextで描画される位置(高さ)が違うので計算して合わせる
      const yOffset = await gettopY(text, font, borderWidth);

      // stroke
      if (borderWidth > 0) {
        textLine.forEach((line, i) => {
          ctx.save();
          ctx.strokeText(line, canvas.width * 0.05, (fontSize * lineHeight * i) + fontSize * 0.05 - yOffset, canvas.width * 0.9);
          ctx.restore();
        });
      }

      // fill
      textLine.forEach((line, i) => {
        ctx.save();
        ctx.fillText(line, canvas.width * 0.05, (fontSize * lineHeight * i) + fontSize * 0.05 - yOffset, canvas.width * 0.9);
        ctx.restore();
      });

      resolve(canvas.toDataURL());
    } catch (e) {
      reject();
    }
  });
}

/**
 * 透明のみが描画されている行を上から探してy座標を返却
 * @param text 描画する文字列
 * @param font 描画するフォント
 * @param borderWidth 描画する境界線の太さ
 * @returns y座標
 */
const gettopY = async (text: string, font: Font, borderWidth: number): Promise<number> => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;

  const textLine = text.split('\n');
  const fontSize = canvas.width / textLine.length;

  const ctx = canvas.getContext('2d')!;
  ctx.lineWidth = borderWidth;
  ctx.lineJoin = 'round';
  ctx.textBaseline = 'top';
  ctx.font = `${fontSize}px '${font.name}', serif`;

  // 1行目だけ描画してどの位置に描画されるか確認
  const line = textLine[0];
  // stroke
  if (borderWidth > 0) {
    ctx.strokeText(line, canvas.width * 0.05, fontSize * 0.05, canvas.width * 0.9);
  }
  // fill
  ctx.fillText(line, canvas.width * 0.05, fontSize * 0.05, canvas.width * 0.9);

  // 透明以外が描画されている一番上のy座標を取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < imageData.data.length; i += 4) {
    // const x = (i/4) % canvas.width;
    // const y = Math.floor((i/4) / canvas.width);

    const r = imageData.data[i + 0];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    
    if (a !== 0) {
      console.log(r, g, b, a, (i/4)/ canvas.width)
      break;
    }

  }

  const y = Math.floor((i/4) / canvas.width);
  return y - 1;
}