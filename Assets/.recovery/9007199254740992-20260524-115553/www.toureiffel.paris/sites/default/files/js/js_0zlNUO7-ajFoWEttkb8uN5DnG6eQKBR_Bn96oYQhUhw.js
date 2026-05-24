/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,Drupal){Drupal.behaviors.my_bo={attach:function(context,settings){if('drupalToolbarMenu' in $.fn){$('.toolbar-menu').drupalToolbarMenu();$('.adminimal-admin-toolbar .view-content .views-table').wrap('<div class="ct_table_ctr" style="width: 100%; overflow-x: scroll;"></div>');}}};}(jQuery,Drupal));;
