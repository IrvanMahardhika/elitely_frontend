import React from 'react';
import { Helmet } from 'react-helmet';

const DocumentHead = () => {
	return (
		<Helmet>
			<meta name='description' content={`Elitely Coding Test`} />
			<title>{`Elitely App`}</title>
		</Helmet>
	);
};

export default DocumentHead;
