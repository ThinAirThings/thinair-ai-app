import { css } from "@emotion/react";

export const stack = (
  stackType: 'h' | 'v',
  hAlign?: 'left' | 'center' | 'right' | 'distribute',
  vAlign?: 'top' | 'center' | 'bottom' | 'distribute'
) => css({
  display: 'flex',
  flexDirection: stackType === 'h' ? 'row' : 'column',
  justifyContent: stackType === 'h'
    ? hAlign === 'left' ? 'flex-start'
      : hAlign === 'center' ? 'center'
      : hAlign === 'right' ? 'flex-end'
      : hAlign === 'distribute' ? 'space-between'
      : 'flex-start'
    : vAlign === 'top' ? 'flex-start'
      : vAlign === 'center' ? 'center'
      : vAlign === 'bottom' ? 'flex-end'
      : vAlign === 'distribute' ? 'space-between'
      : 'flex-start',
  alignItems: stackType === 'h'
    ? vAlign === 'top' ? 'flex-start'
      : vAlign === 'center' ? 'center'
      : vAlign === 'bottom' ? 'flex-end'
      : vAlign === 'distribute' ? 'space-between'
      : 'flex-start'
    : hAlign === 'left' ? 'flex-start'
      : hAlign === 'center' ? 'center'
      : hAlign === 'right' ? 'flex-end'
      : hAlign === 'distribute' ? 'space-between'
      : 'flex-start',
});
