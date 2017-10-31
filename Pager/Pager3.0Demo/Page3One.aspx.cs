using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Pager.Pager3._0Demo
{
    public partial class PageOne : System.Web.UI.Page
    {
        public int pageIndex = 1;
        public int recordCount = 0;
        public int pageSize = 5;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                getPageIndex();
                //绑定数据
                bindData();
            }
        }

        private void getPageIndex()
        {
            object obj = Request.QueryString["pageindex"];
            if (obj == null)
                pageIndex = 1;
            else
                pageIndex = Convert.ToInt32(obj);
        }


        private void bindData()
        {
            List<ItemData> list = new List<ItemData>();
            for (int i = 0; i < 16; i++)
            {
                list.Add(new ItemData()
                {
                    ID = i,
                    Name = "列表数据:" + i
                });
            }
            recordCount = list.Count;
            //获取分页数据
            var pageData = list.OrderBy(l => l.ID)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            Repeater1.DataSource = pageData;
            Repeater1.DataBind();
        }


    }
}
