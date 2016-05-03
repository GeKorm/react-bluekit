import AtomPreview from '../atoms/AtomPreview.react';
import CopyCode from '../atoms/CopyCode.react';
import Highlight from '../atoms/Highlight.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';
import {Map} from 'immutable';

@Radium
export default class Variants extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    styles: RPT.object.isRequired,
  }

  render() {
    const {atom: {propsDefinition}} = this.props

    return (
      <div>
        {Map(propsDefinition).map((value, key) => this.renderProp(key, value))}
      </div>
    )
  }

  renderNoVariants() {
    return <i>There are no possible variants</i>
  }

  renderProp(key, definition) {
    if (!definition.type) return null

    const {type: {name, value}} = definition

    switch (name) {
      case 'string': return this.renderVariants(key, name, ['', `Default string ${key}`])
      case 'number': return this.renderVariants(key, name, [0, 1, 100, 1234.56])
      case 'bool': return this.renderVariants(key, name, [false, true])
      case 'enum' : return this.renderVariants(key, name, value.map(text => text.value.replace(/\'/g, '')))
    }

    return null
  }

  renderVariants(key, type, variants) {
    const {styles} = this.props

    return (
      <div style={[styles.paddedElement, styles.panel]}>
        <h2 id={key} style={styles.headingStyles}>Prop variant: {key}</h2>
        {variants.map(variant => this.renderVariant(key, type, variant))}
      </div>
    )
  }

  renderVariant(key, type, variant) {
    const {atom, componentProps, styles} = this.props
    const variantProps = {...componentProps, [key]: variant}
    const source = `<${atom.componentName} ${renderProp(key, type, variant)} />`

    return (
      <div key={variant} style={styles.pre}>
        <CopyCode source={source} />
        <Highlight className='javascript'>
          {source}
        </Highlight>
        <div style={styles.clear}>
          <AtomPreview atom={atom} variantProps={variantProps} />
        </div>
        <div style={[styles.clear, styles.clear.after]} />
      </div>
    )
  }
}