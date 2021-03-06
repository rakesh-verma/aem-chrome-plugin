/*
 * #%L
 * AEM Chrome Plug-in
 * %%
 * Copyright (C) 2016 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

angular.module('aem-chrome-plugin-app')
/** Filter: queryBlacklistFilter **/
.filter('queryBlacklist', function() {
  return function(queries) {
    var BLACKLIST = [
      'select [nt:base].[jcr:primaryType] as [nt:base.jcr:primaryType] from [nt:base] as [nt:base] where [nt:base].[jcr:uuid] = $id',
    ],
    result = [];

    if (queries) {
      $.each(queries, function(index, query) {
        var blacklisted = false;

        $.each(BLACKLIST, function(index, blacklistEntry) {
            if (query.query.indexOf(blacklistEntry) === 0) {
                blacklisted = true;
                return false;
            }
        });

        if (!blacklisted) {
          result.push(query);
        }
      });
    }

    return result;
  };
});
