import {ListRenderItem as NativeListRenderItem} from 'react-native';
import {ListItemPresentable} from './ListItemPresentable';

export type ListRenderItem<ItemT> =
  | NativeListRenderItem<ItemT>
  | null
  | undefined;

export type VariousContentListRenderItem<ContentT> =
  | NativeListRenderItem<ListItemPresentable<ContentT>>
  | null
  | undefined;
