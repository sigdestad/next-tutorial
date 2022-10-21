import React from 'react'
import {PartProps} from '../../_enonicAdapter/views/BasePart';
import {VariablesGetterResult} from '../../_enonicAdapter/ComponentRegistry';
import {Context} from '../../_enonicAdapter/guillotine/fetchContent';
import {getUrl} from "../../_enonicAdapter/UrlProcessor";

const ChildList = (props: PartProps) => {
    const {data, meta} = props;
    const children = data.get.children;
    if (!children || children.length === 0) {
        return null;
    }
    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            {
                children &&
                <ul>{
                    children.map((child: any, i: number) => (
                        <li key={i}>
                            <a href={getUrl(child._path, meta)}>
                                {child.displayName}
                            </a>
                        </li>
                    ))
                }</ul>
            }
        </main>
    );
};

export default ChildList;

export const getChildList = {
    query: `query($path:ID!, $order:String){
              guillotine {
                getSite {
                  displayName
                }
                get(key:$path) {
                  displayName
                  children(sort: $order) {
                      _path(type: siteRelative)
                      _id
                      displayName
                  }
                }
              }
            }`,
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        return {
            path,
            order: config?.sorting
        }
    }
};

export async function childListProcessor(common: any, context?: Context): Promise<any> {
    common.modifiedBy = 'childListProcessor';
    return common;
}