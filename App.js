import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            scanCount: 0,
            scanInvalid: 0,
	        scanning: '',
	        scan: ''
        }
    }
	get style() {
    	let color = this.state.scanCount > 0 ? (
    		this.state.scanInvalid > 0 ? styles.success : styles.error
		    ) : styles.uninitialized;
	    return [
	        styles.container,
            color
        ];
	}
	validateScan() {
    	let scanned = this.state.scanning;
    	let valid = scanned.trim() == this.state.text.trim();
    	this.setState({
    		scanCount: this.state.scanCount + 1,
		    scanInvalid: this.state.scanInvalid + (valid ? 0 : 1),
		    scanning: '',
		    scan: this.state.scanning
	    }, () => this.refocus());
	}
	refocus() {
		console.log(this.target, {...this.state});
    	if (this.target) {
    		setTimeout(() => this.target.focus(), 0);
	    }
	}
	setTarget(target) {
    	this.target = target;
	}
	init() {
    	this.refocus();
    	this.setState({
    		scanCount: 0,
		    scanInvalid: 0,
		    scan: ''
	    })
	}
	render() {
		return (
            <View style={this.style}>
                <TextInput
	                style={styles.text}
                    placeholder="Scan initial barcode"
                    onChangeText={(text) => this.setState({text})}
                    onSubmitEditing={this.init.bind(this)}
                />
                <Text>Target: {this.state.text}</Text>
	            <Text>Scans: {this.state.scanCount}</Text>
	            <Text>Errors: {this.state.scanInvalid}</Text>
	            <Text>Last Scan: {this.state.scan}</Text>
	            <TextInput
		            style={styles.text}
		            ref={this.setTarget.bind(this)}
	                placeholder="Scan subsequent barcodes"
	                value={this.state.scanning}
	                onChangeText={text => this.setState({scanning:text})}
	                onSubmitEditing={this.validateScan.bind(this)}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		uninitialized: {
			backgroundColor: '#fff'
		},
		success: {
			backgroundColor: '#f00'
		},
		error: {
			backgroundColor: '#0f0'
		},
		text: {
			width: '90%',
			height: 40
		}
	}
);
