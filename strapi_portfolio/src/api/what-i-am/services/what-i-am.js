'use strict';

/**
 * what-i-am service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::what-i-am.what-i-am');
