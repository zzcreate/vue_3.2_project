export const steps = (i18n) =>
  [
    {
      element: '#guide',
      popover: {
        title: i18n('driver.guideBtn'),
        description: i18n('driver.guideText'),
        position: 'left'
      }
    },
    {
      element: '#hamburger',
      popover: {
        title: i18n('driver.hamburgerBtn'),
        description: i18n('driver.hamburgerText'),
        position: 'bottom'
      }
    },
    {
      element: '#screenFull',
      popover: {
        title: i18n('driver.fullScreen'),
        description: i18n('driver.fullScreenText'),
        position: 'left'
      }
    }
  ]
// 绑定的元素 和弹出层数据对象 多个组成的数组数据
