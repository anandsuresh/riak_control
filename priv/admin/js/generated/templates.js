Ember.TEMPLATES['application'] = Ember.Handlebars.compile('<div id="header">    <div id="navbar">        <a id="riak-control-logo"></a>        <!--<a id="basho-logo" href="http://www.basho.com" target="_blank"></a>-->        <nav>            <ul id="nav-ul">                <li id="nav-ring" class="nav-li"><a {{action showRing href=true}} class="gui-text-bold nav-item"></a><span class="indicator"></span></li>                <li id="nav-cluster" class="nav-li"><a {{action showCluster href=true}} class="gui-text-bold nav-item"></a><span class="indicator"></span></li>                <li id="nav-snapshot" class="nav-li"><a {{action showSnapshot href=true}} class="gui-text-bold nav-item"></a><span class="indicator"></span></li>                <!--                <li id="nav-objects" class="nav-li-disabled"><a class="gui-text-bold nav-item"><span class="nav-text">Objects</span></a></li>                <li id="nav-mapreduce" class="nav-li-disabled"><a class="gui-text-bold nav-item"><span class="nav-text">MapReduce</span></a></li>                <li id="nav-graphs" class="nav-li-disabled"><a class="gui-text-bold nav-item"><span class="nav-text">Graphs</span></a></li>                <li id="nav-logs" class="nav-li-disabled"><a class="gui-text-bold nav-item"><span class="nav-text">Logs</span></a></li>                <li id="nav-support" class="nav-li-disabled"><a class="gui-text-bold nav-item"><span class="nav-text">Support</span></a></li>                -->            </ul>            <!-- will not need these anymore or the corresponding js            <div id="active-nav"></div>            <div id="split-bar"></div>            -->        </nav>    </div></div><div id="wrapper" class="split gui-text">    <section id="content-well">{{outlet}}</section>        <footer>        <div class="side-line"></div>        <div class="title-box">            <span class="vert-border-left"></span>            <a id="basho-logo" href="http://www.basho.com" target="_blank"><img src="/admin/ui/images/basho-logo.png" alt=""/></a>            <span class="vert-border-right"></span>        </div>        <div class="side-line"></div>        <div class="clear"></div>    <footer></div><!-- #wrapper --><div id="tooltips" class="hide">    <div id="inner-tooltips">        <table><tr>            <td id="display-tips" class="gui-text"></td>        </tr></table>    </div></div>');
Ember.TEMPLATES['snapshot'] = Ember.Handlebars.compile('<section id="title-container">  <div class="side-line"></div>  <div class="title-box">    <span class="vert-border-left"></span>    <h1 id="snapshot-headline" class="gui-headline-bold page-title">Current Snapshot</h1>    <span class="vert-border-right"></span>  </div>  <div class="side-line"></div>  <div class="clear"></div></section><div class="relative">  {{#if healthyCluster}}    <div id="healthy-cluster">        <img id="health-indicator" src="/admin/ui/images/healthy-cluster.png" alt="" />        <section>          <h2 class="gui-headline-bold has-cut">Your cluster is healthy.</h2>          <h3 class="">You currently have...</h3>          <ul class="gui-text bulleted">              <li><span class="emphasize monospace">0</span> Unreachable nodes</li>              <li><span class="emphasize monospace">0</span> Incompatible nodes</li>              <li><span class="emphasize monospace">0</span> Nodes marked as down</li>              <li><span class="emphasize monospace">0</span> Nodes experiencing low memory</li>              <li>Nothing to worry about because Riak is your friend</li>          </ul>        </section>    </div>  {{else}}    <div id="unhealthy-cluster">        <img id="health-indicator" src="/admin/ui/images/unhealthy-cluster.png" alt="" />        <section>          <h2 class="gui-headline-bold has-cut">Your cluster has problems.</h2>          {{#if areUnreachableNodes}}            <!-- Unreachable Nodes List -->            <h3 id="unreachable-nodes-title" class="">The following nodes are currently unreachable:</h3>            <ul id="unreachable-nodes-list" class="gui-text bulleted monospace">              {{#each unreachableNodes}}                <li><a class="go-to-cluster" {{action showCluster href=true}}>{{name}}</a></li>              {{/each}}            </ul>          {{/if}}          {{#if areIncompatibleNodes}}            <!-- Incompatible Nodes List -->            <h3 id="incompatible-nodes-title" class="">The following nodes are currently incompatible with Riak Control:</h3>            <ul id="incompatible-nodes-list" class="gui-text bulleted monospace">              {{#each incompatibleNodes}}                <li><a class="go-to-cluster" {{action showCluster href=true}}>{{name}}</a></li>              {{/each}}            </ul>          {{/if}}          {{#if areDownNodes}}            <!-- Down Nodes List -->            <h3 id="down-nodes-title" class="">The following nodes are currently marked down:</h3>            <ul id="down-nodes-list" class="gui-text bulleted monospace">              {{#each downNodes}}                <li><a class="go-to-cluster" {{action showCluster href=true}}>{{name}}</a></li>              {{/each}}            </ul>          {{/if}}          {{#if areLowMemNodes}}            <!-- Low-Mem Nodes List -->            <h3 id="low_mem-nodes-title" class="">The following nodes are currently experiencing low memory:</h3>            <ul id="low_mem-nodes-list" class="gui-text bulleted monospace">              {{#each lowMemNodes}}                <li><a class="go-to-cluster" {{action showCluster href=true}}>{{name}}</a></li>              {{/each}}            </ul>          {{/if}}        </section>    </div>  {{/if}}</div>');
Ember.TEMPLATES['cluster'] = Ember.Handlebars.compile('<h1 id="cluster-headline" class="gui-headline-bold">Cluster View</h1><div id="add-node">    <h3 class="gui-headline">Add Nodes to the Cluster...</h3>    <table>        <tr>            <td id="add-node-box">                <div class="gui-field gui-text">                    <div class="gui-field-bg">                        <input id="node-to-add" class="gui-field-input gui-text" type="text" name="nodeName" />                    </div>                    <div class="gui-field-cap-left"></div>                    <div class="gui-field-cap-right"></div>                </div>            </td>            <td class="button-column">                <a id="add-node-button" class="gui-point-button gui-text-bold right">                    <span class="gui-button-msg">Add Node</span>                </a>            </td>        </tr>    </table>    <div id="node-error" class="hide">        <a class="close-error gui-text"></a>        <a class="error-text offline"></a>        <a class="error-link gui-text underline" href="#"></a>    </div></div><!-- #add-node --><h2 class="gui-headline-bold has-cut">    Node List    <span id="total-number" class="gui-text"></span></h2><div id="node-list" class="hide">    <table class="list-table" id="cluster-table">        <tr class="table-head has-cut">            <td><h3 class="gui-headline">Status</h3></td>            <td><h3 class="gui-headline">Name</h3></td>            <td><h3 class="gui-headline">Actions</h3></td>            <td><h3 class="gui-headline">Partitions</h3></td>            <td><h3 class="gui-headline">Memory Usage</h3></td>        </tr>    </table></div><div class="spinner-box"><img id="cluster-spinner" class="spinner" src="/admin/ui/images/spinner.gif"></div><!-- node template --><table class="hide">    <tr class="node row-template">        <td class="status-box gui-text">            <a class="gui-light status-light"><span class="status">Joining...</span></a>        </td>        <td class="name-box gui-text">            <div class="gui-field gui-text">                <div class="gui-field-bg">                    <div class="name gui-field-input"></div>                </div>                <div class="gui-field-cap-left"></div>                <div class="gui-field-cap-right"></div>            </div>        </td>        <td class="more-actions-slider-box gui-text">            <div class="gui-slider gui-text">                <div class="gui-slider-activate"></div>                <div class="gui-slider-groove">                    <div class="gui-slider-msg isLeft">View Actions</div>                    <div class="gui-slider-msg isRight">Hide Actions</div>                </div>            </div>            <div class="gui-slider-leaving hide"></div>        </td>        <td class="gui-text ring_pct-box">            <div class="left pct-arrows pct-static">                <div class="green-pct-arrow"></div>            </div>            <div class="left gui-field gui-text pct-box">                <div class="gui-field-bg">                    <div class="i-block ring_pct gui-field-input"></div>                    <!--                    <span class="monospace gray-text">:</span>                    <div class="i-block pending_pct gui-field-input"></div>                    -->                </div>                <div class="gui-field-cap-left"></div>                <div class="gui-field-cap-right"></div>            </div>            <div class="clear"></div>        </td>        <td class="gui-text memory-box">            <div class="left membar-bg">                <div class="erlang-mem mem-color left" name=""></div>                <div class="non-erlang-mem mem-color left" name=""></div>                <div class="unknown-mem"></div>                <div class="membar-fg"></div>            </div>            <span class="free-memory left"></span>        </td>    </tr>    <tr class="more-node-actions more-actions-template">        <td>&nbsp;</td>        <td colspan="4" class="more-actions-td">            <div class="actions-pointer hide"></div>            <div class="actions-box gui-text hide">                <div class="shutdown-box left">                    <a class="shutdown-button left"></a>                    <span class="shutdown-label gui-text block left">Stop Node</span>                    <div class="clear"></div>                </div>                <div class="leave-cluster-box left">                    <a class="leave-cluster-button left"></a>                    <span class="leave-cluster-label gui-text block left">Leave Cluster</span>                    <div class="clear"></div>                </div>                <div class="markdown-box left">                    <a class="markdown-button left pressed disabled"></a>                    <span class="markdown-label gui-text block left disabled">Mark Down</span>                    <div class="clear"></div>                </div>                <div class="clear"></div>            </div>            <div class="clear"></div>        </td>    </tr></table><!-- end node template -->');
Ember.TEMPLATES['ring'] = Ember.Handlebars.compile('<section id="title-container">  <div class="side-line"></div>  <div class="title-box">    <span class="vert-border-left"></span>    <h1 id="snapshot-headline" class="gui-headline-bold page-title">Current Ring</h1>    <span class="vert-border-right"></span>  </div>  <div class="side-line">    {{outlet partitionFilter}}  </div>  <div class="clear"></div></section><ul class="pagination gui-text">  <li name="prev"><span class="paginator" {{action prevPage href=true target="controller"}}>Prev</span></li>  {{#each pages}}    {{view RiakControl.PaginationItemView contentBinding="this"}}  {{/each}}  <li name="next"><span class="paginator" {{action nextPage href=true target="controller"}}>Next</span></li></ul><div class="cut"></div><div id="partition-list" class="has-cut">    <table class="list-table" id="ring-table">        <thead>            <tr class="table-head has-cut">                <td><h3>#</h3></td>                <td><h3>Owner Node</h3></td>                <td><h3>KV</h3></td>                <td><h3>Pipe</h3></td>                <td><h3>Search</h3></td>            </tr>        </thead>        {{#collection RiakControl.PartitionView contentBinding="controller.paginatedContent"}}          {{#with view.content}}          <td class="partition-number gui-text">{{i}}</td>          <td class="owner-box gui-text">              <div class="gui-field gui-text">                  <div class="gui-field-bg">                      <div class="owner gui-field-input">{{node}}</div>                      <div class="partition-index hide">{{index}}</div>                  </div>                  <div class="gui-field-cap-left"></div>                  <div class="gui-field-cap-right"></div>              </div>          </td>          {{/with}}          {{#with view}}          <td class="kv-box gui-text">              <a {{bindAttr class="kvIndicator lightClasses"}}>                  <span class="kv-status">{{kvStatus}}</span>                  <span class="hide fallback-to"></span>              </a>          </td>          <td class="pipe-box gui-text">              <a {{bindAttr class="pipeIndicator lightClasses"}}>                  <span class="pipe-status">{{pipeStatus}}</span>                  <span class="hide fallback-to"></span>              </a>          </td>          <td class="search-box gui-text">              <a {{bindAttr class="searchIndicator lightClasses"}}>                  <span class="search-status">{{searchStatus}}</span>                  <span class="hide fallback-to"></span>              </a>          </td>          {{/with}}        {{/collection}}    </table></div><ul class="pagination gui-text">  <li name="prev"><span class="paginator" {{action prevPage href=true target="controller"}}>Prev</span></li>  {{#each pages}}    {{view RiakControl.PaginationItemView contentBinding="this"}}  {{/each}}  <li name="next"><span class="paginator" {{action nextPage href=true target="controller"}}>Next</span></li></ul><div class="cut"></div>');
Ember.TEMPLATES['partition_filter'] = Ember.Handlebars.compile('<div id="ring-filter" class="right">    <h4 class="gui-headline-bold">Filter</h4>    <div class="gui-dropdown-wrapper">        <div class="gui-dropdown-bg gui-text"></div>        <div class="gui-dropdown-cap left"></div>        {{view RiakControl.PartitionFilterSelectView id="filter" classNames="gui-dropdown" contentBinding="filters" optionLabelPath="content.name" optionValuePath="content.value" prompt="All" selectionBinding="controller.selectedPartitionFilter"}}    </div></div>');
Ember.TEMPLATES['pagination_item'] = Ember.Handlebars.compile('{{#with view}}<a {{action paginateRing content href=true}}>  <span {{bindAttr class="spanClasses isActive:active"}}>{{content.page_id}}</span></a>{{/with}}');
