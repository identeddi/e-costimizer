/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.milke.ecost.rest;

import java.io.IOException;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.xml.ws.WebServiceContext;

import de.milke.ecost.dao.AccountDao;

/**
 * JAX-RS Example
 * <p/>
 * This class produces a RESTful service to read/write the contents of the
 * members table.
 */
@Path("/login")
@Stateless
@RolesAllowed("admin")
public class LoginService {

    static Logger LOG = Logger.getLogger(LoginService.class.getName());

    @Inject
    private AccountDao accountDao;

    @Resource
    WebServiceContext webServiceContext;

    @DELETE
    @Path("/session")
    public void deleteSession(@Context HttpServletRequest request,
	    @Context HttpServletResponse response) throws ServletException, IOException {
	LOG.info("Delete session: " + request.getSession().getId());
	response.setHeader("Cache-Control", "no-cache, no-store");

	response.setHeader("Pragma", "no-cache");

	response.setHeader("Expires", new java.util.Date().toString());
	if (request.getSession(false) != null) {

	    request.getSession(false).invalidate();// remove session.

	}

	// if (request.getSession() != null) {
	//
	// request.getSession().invalidate();// remove session.
	//
	// }
	request.logout();
	response.sendRedirect(request.getContextPath());
	return;
    }

    @POST
    @Path("/login")
    public String registerget(@QueryParam("username") String username,
	    @QueryParam("password") String password) {
	LOG.info("logged in - username: " + username + "password: " + password);
	return "successfully logged in " + username;
    }
}
