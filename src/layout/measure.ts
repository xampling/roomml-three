import { LayoutSettings, RoomMLNode, Size3DPartial } from '../roomml/types';

export type Size3D = { w: number; d: number; h: number };

export function measureNode(node: RoomMLNode): Size3D {
  switch (node.type) {
    case 'room':
    case 'furniture':
      return { ...node.size };
    case 'door':
    case 'window':
      return { w: 0, d: 0, h: 0 };
    case 'group':
    case 'house':
    case 'floor':
    case 'container':
      return measureContainer(node);
    default:
      return { w: 0, d: 0, h: 0 };
  }
}

function measureContainer(node: RoomMLNode & { children?: RoomMLNode[] }): Size3D {
  const layout = getLayout(node);
  const gap = layout.gap ?? 0;
  const layoutChildren = (node.children ?? []).filter((c) =>
    ['house', 'floor', 'container', 'group', 'room', 'furniture'].includes(c.type)
  );

  const childSizes = layoutChildren.map((c) => measureNode(c));
  const count = childSizes.length;

  const sumMain = childSizes.reduce((acc, s) => acc + (layout.dir === 'row' ? s.w : s.d), 0);
  const maxCross = childSizes.reduce((acc, s) => Math.max(acc, layout.dir === 'row' ? s.d : s.w), 0);
  const maxHeight = childSizes.reduce((acc, s) => Math.max(acc, s.h), 0);

  const naturalW = layout.dir === 'row' ? sumMain + gap * Math.max(0, count - 1) : maxCross;
  const naturalD = layout.dir === 'row' ? maxCross : sumMain + gap * Math.max(0, count - 1);

  const size = getSize(node);

  return {
    w: size?.w ?? naturalW,
    d: size?.d ?? naturalD,
    h: size?.h ?? maxHeight
  };
}

function getLayout(node: RoomMLNode & { layout?: LayoutSettings }): LayoutSettings {
  if ('layout' in node && node.layout) {
    return node.layout;
  }
  return { mode: 'flex', dir: 'row', gap: 0 };
}

function getSize(node: RoomMLNode & { size?: Size3DPartial }): Size3DPartial | undefined {
  if ('size' in node) {
    return node.size;
  }
  return undefined;
}
