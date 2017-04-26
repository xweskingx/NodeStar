def mnist_out(epochs, batch_size, net):
    init_op = tf.global_variables_initializer()
    x = net.x
    y = net.y

    with tf.Session() as sess:
        sess.run(init_op)
        # Train
        for i in range(epochs):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)

            net.optimize.run(feed_dict={x: batch_xs, y: batch_ys})

            if i % 100 == 0:
                err = sess.run(net.error, feed_dict={x: mnist.test.images, y: mnist.test.labels})
                print('Step: {}, Training Error: {}'.format(i, err))

        t_err = sess.run(net.error, feed_dict={x: mnist.test.images, y: mnist.test.labels})

        print("Test Error: {}".format(t_err))
