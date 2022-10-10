import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DetailslistbasicWebPartStrings';
import Detailslistbasic from './components/Detailslistbasic';
// import { IDetailslistbasicProps } from './components/IDetailslistbasicProps';
import { sp } from '@pnp/sp';



export interface IDetailslistbasicWebPartProps {
  description: string;
}

export default class DetailslistbasicWebPart extends BaseClientSideWebPart<IDetailslistbasicWebPartProps> {
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
      Detailslistbasic,
      {}
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
