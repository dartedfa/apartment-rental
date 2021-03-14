/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {createContext, useContext, useState, cloneElement} from 'react'
import {Dialog} from '../atoms/Dialog'
import {CircleButton} from '../atoms/Button'
import VisuallyHidden from '@reach/visually-hidden'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const ModalContext = createContext()
ModalContext.displayName = 'ModalContext'

function Modal(props) {
  const [isOpen, setIsOpen] = useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = useModal()

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = useModal()
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = useModal()

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

function ModalContents({title, children, ...props}) {
  return (
    <ModalContentsBase {...props}>
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>X</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '3rem'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

function useModal() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal should be wrapped by ModalProvider.')
  }

  return context
}

export {Modal, ModalOpenButton, ModalDismissButton, ModalContents}
