import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CustomitemrowsWebPartStrings';
import Customitemrows from './components/Customitemrows';
import { ICustomitemrowsProps } from './components/ICustomitemrowsProps';
import { sp } from '@pnp/sp';

export interface ICustomitemrowsWebPartProps {
  description: string;
}

export default class CustomitemrowsWebPart extends BaseClientSideWebPart<ICustomitemrowsWebPartProps> {


  protected async onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        sp: {
          baseUrl: this.context.pageContext.web.absoluteUrl
        }
      });
    })
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      Customitemrows,
      {
        // description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
