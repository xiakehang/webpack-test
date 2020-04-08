import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import utils from '../../../utils';
import * as cfgu from '../../../utils/config';
import { Switch, Modal } from 'antd';
import uid from 'uniqid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { enterConfig, getConfig, setConfig, doConfig, clearConfig, exitConfig } from '../../../actions';

import DataForm from '../DataForm';
import style from '../DataTable.scss';

import * as meta from '../../../utils/meta';

class DeviceLog extends PureComponent {

    static propTypes = {
    }

    state = {
        path: ''
    }

    componentWillMount() {
        const { view, config: { stack }, getConfig } = this.props;

        let path = view.meta.path;

        if (view && stack) {

            getConfig(utils.fillInPath('/device_configs/{id}/log/override', view, stack));

            path = utils.fillInPath(path, view, stack);

            this.setState({
                path
            });

            getConfig(path);
        }

    }

    render() {

        let { view, spec, config, config: { entries, stack }, getConfig, doConfig } = this.props;
        view = _.cloneDeep(_.omit(meta.appendRef(view, spec), 'widget'));

        let overridden = _.get(entries, [utils.fillInPath('/device_configs/{id}/log/override', view, stack), 'result'], false);

        if (overridden === false) {
            view.actions = [];
        }

        let header = <div className={'header-base'}>
            {
                !utils.isUnavailable(view, stack) &&
                <div style={{
                    position: 'absolute',
                    right: '8px'
                }}>
                    <span>OVERRIDE: </span>
                    <Switch checked={overridden}
                        onChange={(checked) => {
                            Modal.confirm({
                                title: 'Confirm',
                                content: `Do you want to ${checked ? 'enable' : 'disable'} override?`,
                                onOk() {
                                    doConfig({
                                        entry: utils.fillInPath(`/device_configs/{id}/log_override/${checked}`, view, stack),
                                        action: 'update',
                                        noExit: true,
                                        onSuccess: () => {
                                            getConfig(utils.fillInPath('/device_configs/{id}/log/override', view, stack));
                                            getConfig(utils.fillInPath('/device_configs/{id}/log', view, stack));
                                        }
                                    })
                                }
                            });
                        }}
                    />



                </div>
            }
        </div>;

        // manipulate view
        _.each(view.fields, f => {
            _.extend(f, {
                readonly: !overridden
            });
        });

        return <div>
            {header}
            {
                utils.isUnavailable(view, stack) ?
                    <div>{'Please Save Parent Config First'}</div> :
                    <DataForm {...{
                        view,
                        values: { ..._.get(config, ['entries', this.state.path, 'result'], '') },
                        handleAction: (entry, view, stack, values) => {
                            return 'put'
                        }

                    }} />}

        </div>;

    }

}

export default connect(
    (state) => {
        return {
            config: state.config || {},
            spec: state.meta.spec || {}
        }
    },
    {
        getConfig,
        doConfig
    }

)(DeviceLog)
